import csv

out_data = []
with open("decl_po_001.csv", 'r', encoding='utf-8') as f:
    data = csv.reader(f)
    for row in data:
        row = [x for x in row if x != ' ']
        index = [row.index(x) for x in row if x != '']
        out_data.append(row)
print(out_data[0])

for i in index:
    print(out_data[0][i])


