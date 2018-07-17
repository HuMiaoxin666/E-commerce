import csv
f_or = open("decl_po_001.csv", 'r', encoding='utf-8')
f_infor = open("orderInfor.csv", 'r', encoding='utf-8')

data_or = csv.reader(f_or)
time_dict = {}
for row in data_or:
    time_dict[row[0]] = [row[2], row[-1]]
data_infor = csv.reader(f_infor)
count = 0
outfile = open("newInfor.csv", 'w', newline='', encoding = 'utf-8')

for row in data_infor:
    if count > 0:
        cur_time = time_dict[row[0]]
        for t in cur_time:
            row.append(t)
        print(row)
        csv.writer(outfile).writerow(row)
    else:
        row.append("startTime")
        row.append("endTime")
        csv.writer(outfile).writerow(row)
    count += 1
outfile.close()