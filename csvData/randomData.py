import random
data = open("test.csv", 'r', encoding='utf-8')
outfile = open("testHeat.csv", 'w', newline='',encoding='utf-8')

index = 0
while  True:
    line = data.readline()
    if not line:
        break
    else:
        if index > 0:
            count = random.randint(1, 100)
            line = line[0:-1] + ',' + str(count) + '\n'
            outfile.write(line)
        else:
            line = line[0:-1] + ',' + "count" + '\n'
        index += 1
outfile.close()
