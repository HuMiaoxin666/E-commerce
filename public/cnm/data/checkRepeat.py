import csv
order_dict = {}
count= 0
with open("decl_po_dtl_001.csv", 'r', encoding='utf-8') as f:
    data = csv.reader(f)
    for row in data:
        if row[0] not in order_dict:
            order_dict[row[0]] = ''
        else:
            print(row)
            count += 1
print(count/2)