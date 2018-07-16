import csv

with open("decl_po_001.csv", 'r' ,encoding='utf-8') as f:
    data = csv.reader(f)
    out_data = []
    dictLoc = {}
    for row in data:
        cur_loc = row[10] + '-' + row[11]
        if cur_loc not in dictLoc:
            dictLoc[cur_loc] = ''
            out_data.append([row[10], row[11]])

    print(out_data)
    outfile = open("LocName.csv", 'w', newline='')
    csv.writer(outfile).writerows(out_data)
    outfile.close()

