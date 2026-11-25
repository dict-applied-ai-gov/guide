"""Snapshot a few PSA OpenSTAT tables into public/api/v1 as JSON and CSV.

Usage: python3 scripts/fetch-psa.py public/api/v1

Refresh the training API (the files the Day 3 data website lab reads). Needs curl.
"""
import csv
import io
import json
import re
import subprocess
import sys
from datetime import date

BASE = "https://openstat.psa.gov.ph/PXWeb/api/v1/en/DB"
OUT = sys.argv[1]
TODAY = date.today().isoformat()


def curl_raw(args):
    return subprocess.run(["curl", "-sf", "-m", "180", *args], check=True, capture_output=True).stdout


def curl(args):
    return json.loads(curl_raw(args).decode("utf-8-sig"))


def num(s):
    try:
        return float(s)
    except (TypeError, ValueError):
        return None


def post(path, query):
    """Return [({variable: text}, value)] using PXWeb's native json format."""
    meta = get(path)
    names = {v["code"]: dict(zip(v["values"], v["valueTexts"])) for v in meta["variables"] if "values" in v}
    body = json.dumps({"query": query, "response": {"format": "json"}})
    js = curl(["-X", "POST", "-H", "Content-Type: application/json", "--data-binary", body, f"{BASE}/{path}"])
    dims = [c["code"] for c in js["columns"] if c["type"] in ("d", "t")]
    out = []
    for row in js["data"]:
        labels = {d: names.get(d, {}).get(k, k) for d, k in zip(dims, row["key"])}
        out.append((labels, num(row["values"][0])))
    return out


def post_csv(path):
    body = json.dumps({"query": [], "response": {"format": "csv"}})
    raw = curl_raw(["-X", "POST", "-H", "Content-Type: application/json", "--data-binary", body, f"{BASE}/{path}"])
    text = raw.decode("cp1252").lstrip("﻿ï»¿")
    return list(csv.reader(io.StringIO(text)))


def get(path):
    return curl([f"{BASE}/{path}"])


def cells(x):
    return x


def clean_area(t):
    level = (len(t) - len(t.lstrip("."))) // 2
    name = t.lstrip(".")
    name = re.sub(r"(\s+(r\d|\d+/|[a-z]/),?)+\s*$", "", name)  # footnote marks
    name = re.sub(r"\s+[a-z]/\s*$", "", name)
    name = re.sub(r"\s+\d+/", "", name)
    name = re.sub(r"\s{2,}", " ", name).strip().rstrip(",").rstrip("*").strip()
    if name.isupper():
        name = name.title()
    return level, name


def sel(code, values):
    return {"code": code, "selection": {"filter": "item", "values": values}}


def write(name, meta, columns, rows):
    payload = {**meta, "retrieved": TODAY, "columns": columns, "count": len(rows), "rows": rows}
    with open(f"{OUT}/{name}.json", "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=1)
    with open(f"{OUT}/{name}.csv", "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=[c["name"] for c in columns])
        w.writeheader()
        w.writerows(rows)
    print(name, len(rows))


MONTHS = {m: i + 1 for i, m in enumerate(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])}
MON3 = {m[:3]: i for m, i in MONTHS.items()}

# 1. Rice retail prices, monthly
path = "2M/2018NEW/0042M4ARN01.px"
geos = ["000000000", "130000000", "060000000", "063000000", "063022000", "180000000", "064500000", "064501000", "074600000"]
js = post(path, [sel("Geolocation", geos), sel("Commodity", ["0", "1", "2"]), sel("Period", [str(i) for i in range(12)])])
rows = []
for c, v in cells(js):
    if v is None:
        continue
    level, area = clean_area(c["Geolocation"])
    rows.append({
        "date": f"{c['Year']}-{MONTHS[c['Period']]:02d}",
        "year": int(c["Year"]),
        "month": MONTHS[c["Period"]],
        "area": area,
        "area_level": level,
        "commodity": c["Commodity"].title().replace(", 1 Kg", ""),
        "price_php_per_kg": round(v, 2),
    })
rows.sort(key=lambda r: (r["area_level"], r["area"], r["commodity"], r["date"]))
write("rice-prices", {
    "title": "Retail prices of rice per kilogram, monthly",
    "publisher": "Philippine Statistics Authority (PSA)",
    "source": "PSA OpenSTAT, Cereals: Retail Prices of Agricultural Commodities by Geolocation, Commodity, Year and Period (2018-based, new geographic code)",
    "source_url": f"{BASE}/{path}",
    "notes": "Average retail prices in Philippine pesos per kilogram. Months with no published value are left out. Negros Occidental and the City of Bacolod are in the Negros Island Region (NIR).",
}, [
    {"name": "date", "description": "Year and month, YYYY-MM"},
    {"name": "year", "description": "Year"},
    {"name": "month", "description": "Month number, 1 to 12"},
    {"name": "area", "description": "Country, region, province, or city"},
    {"name": "area_level", "description": "0 country, 1 region, 2 province or city"},
    {"name": "commodity", "description": "Rice type"},
    {"name": "price_php_per_kg", "description": "Average retail price, PHP per kilogram"},
], rows)

# 2. Inflation (year-on-year change of CPI), monthly
path = "2M/PI/CPI/2018NEW/0012M4ACP23.px"
meta = get(path)
comm = meta["variables"][1]
want = {}
for v, t in zip(comm["values"], comm["valueTexts"]):
    if t.startswith("0 - ALL ITEMS") or t.startswith("01 - FOOD AND NON-ALCOHOLIC") or t.startswith("01.1 - FOOD") or re.match(r"^01\.1\.1\.1\.1 - Rice", t) or t.startswith("04 - HOUSING") or t.startswith("07 - TRANSPORT"):
        want[v] = t
js = post(path, [sel("Geolocation", ["0", "53", "115", "116", "117", "118"]), sel("Commodity Description", list(want)), sel("Period", [str(i) for i in range(12)])])
rows = []
for c, v in cells(js):
    if v is None:
        continue
    level, area = clean_area(c["Geolocation"])
    group = re.sub(r"^[\d.]+ - ", "", c["Commodity Description"]).replace(" (ND)", "").strip()
    group = group[:1] + group[1:].lower() if group.isupper() else group
    rows.append({
        "date": f"{c['Year']}-{MON3[c['Period']]:02d}",
        "year": int(c["Year"]),
        "month": MON3[c["Period"]],
        "area": area,
        "area_level": level,
        "item": group,
        "inflation_pct": round(v, 1),
    })
rows.sort(key=lambda r: (r["area_level"], r["area"], r["item"], r["date"]))
write("inflation", {
    "title": "Inflation rate (year-on-year change of the Consumer Price Index), monthly",
    "publisher": "Philippine Statistics Authority (PSA)",
    "source": "PSA OpenSTAT, Year-on-Year Changes of the Consumer Price Index in Percent by Commodity Group (2018=100)",
    "source_url": f"{BASE}/{path}",
    "notes": "Percent change from the same month a year earlier, for all income households. 2018 = 100.",
}, [
    {"name": "date", "description": "Year and month, YYYY-MM"},
    {"name": "year", "description": "Year"},
    {"name": "month", "description": "Month number, 1 to 12"},
    {"name": "area", "description": "Country, region, province, or city"},
    {"name": "area_level", "description": "0 country, 1 region, 2 province or city"},
    {"name": "item", "description": "Commodity group (All items is the headline rate)"},
    {"name": "inflation_pct", "description": "Year-on-year change, percent"},
], rows)

# 3. Population, censuses 2010 to 2024
path = "1A/PO_2024/0211A6DAPG0.px"
table = post_csv(path)
header = table[0]
flat = []
for line in table[1:]:
    if not line:
        continue
    for h, val in zip(header[1:], line[1:]):
        flat.append(({"Geographic Location": line[0], "Parameter": h}, num(val)))
by_area = {}
order = []
for c, v in flat:
    key = c["Geographic Location"]
    if key not in by_area:
        level, area = clean_area(key)
        by_area[key] = {"area": area.title() if area.isupper() else area, "area_level": level}
        order.append(key)
    p = c["Parameter"]
    m = re.search(r"Total Population \(\d+ \w+ (\d{4})\)", p)
    if m:
        by_area[key][f"population_{m.group(1)}"] = int(v) if v is not None else None
    m = re.search(r"Population Growth \((\d{4}) - (\d{4})\)", p)
    if m:
        by_area[key][f"growth_rate_{m.group(1)}_{m.group(2)}"] = v
rows = [by_area[k] for k in order]
cols = [{"name": "area", "description": "Country, region, province, or highly urbanized city"}, {"name": "area_level", "description": "0 country, 1 region, 2 province or highly urbanized city, 3 city or municipality"}]
for y in ["2010", "2015", "2020", "2024"]:
    cols.append({"name": f"population_{y}", "description": f"Total population, {y} census"})
for a, b in [("2010", "2015"), ("2015", "2020"), ("2015", "2024"), ("2020", "2024")]:
    cols.append({"name": f"growth_rate_{a}_{b}", "description": f"Annual population growth rate {a} to {b}, percent"})
for r in rows:
    for c in cols:
        r.setdefault(c["name"], None)
rows = [{c["name"]: r[c["name"]] for c in cols} for r in rows]
write("population", {
    "title": "Population and annual growth rate, by region, province, city, and municipality",
    "publisher": "Philippine Statistics Authority (PSA)",
    "source": "PSA OpenSTAT, Population and Annual Population Growth Rate of the Philippines and its Regions, Provinces, and Highly Urbanized Cities Based on the 2010, 2015, 2020 and 2024 Population Census",
    "source_url": f"{BASE}/{path}",
    "notes": "Census reference dates: 1 May 2010, 1 August 2015, 1 May 2020, 1 July 2024. Regions follow the table's own grouping. A province row marked as excluding its highly urbanized city (for example Negros Occidental without the City of Bacolod) does not include that city's population; the city has its own row.",
}, cols, rows)

# 4. Poverty incidence among population, 2018, 2021, 2023
path = "1F/FY/0041F3DF02A.px"
js = post(path, [sel("Threshold/Incidence/Parameters", ["0", "1", "2"])])
by_area = {}
order = []
for c, v in cells(js):
    key = c["Geolocation"]
    if key not in by_area:
        level, area = clean_area(key)
        by_area[key] = {"area": area.title() if area.isupper() else area, "area_level": level}
        order.append(key)
    p = c["Threshold/Incidence/Parameters"]
    y = c["Year"]
    if p.startswith("Annual Per Capita Poverty Threshold"):
        by_area[key][f"poverty_threshold_php_{y}"] = round(v) if isinstance(v, (int, float)) else None
    elif p.startswith("Poverty Incidence"):
        by_area[key][f"poverty_incidence_pct_{y}"] = v
    elif p.startswith("Coefficient"):
        by_area[key][f"cv_{y}"] = v
cols = [{"name": "area", "description": "Country, region, province, or highly urbanized city"}, {"name": "area_level", "description": "0 country, 1 region, 2 province, district, or city"}]
for y in ["2018", "2021", "2023"]:
    cols.append({"name": f"poverty_incidence_pct_{y}", "description": f"Share of the population below the poverty threshold, {y}, percent"})
for y in ["2018", "2021", "2023"]:
    cols.append({"name": f"poverty_threshold_php_{y}", "description": f"Annual per capita poverty threshold, {y}, PHP"})
for y in ["2018", "2021", "2023"]:
    cols.append({"name": f"cv_{y}", "description": f"Coefficient of variation of the {y} estimate (above 20 means use with caution)"})
rows = [{c["name"]: by_area[k].get(c["name"]) for c in cols} for k in order]
write("poverty", {
    "title": "Poverty incidence among population, by region, province, and highly urbanized city",
    "publisher": "Philippine Statistics Authority (PSA)",
    "source": "PSA OpenSTAT, Table 2a. Annual Per Capita Poverty Threshold and Poverty Incidence Among Population with Measures of Precision, by Region, Province and Highly Urbanized Cities: 2018, 2021, and 2023",
    "source_url": f"{BASE}/{path}",
    "notes": "Survey estimates from the Family Income and Expenditure Survey. OpenSTAT publishes these rounded to whole numbers; PSA's poverty press releases give one decimal place. Check the coefficient of variation: a high CV means the estimate is less reliable. The table groups areas by the regions used at the time of the survey.",
}, cols, rows)
