import numpy as np
import soundfile as sf
import json
import random
import argparse


def rand_elims(lst, elims):
    r = random.choice(lst)
    while r in elims:
        r = random.choice(lst)
    return r


fname_dataname = "test_redux_136"
with open("./metafile/jsons/{}.json".format(fname_dataname), "r") as f:
    data_no = json.load(f)
data_no.remove(2048)

anchors = random.sample(data_no, 56)

print(anchors)

# parser = argparse.ArgumentParser(description="select original file")
# parser.add_argument("--set", type=int)
# args = parser.parse_args()

# test1
print("test1")
dict_tri = {}
for i in range(1, 8):
    print("set ", i)
    dict_tri[i] = {}
    anchors_mini = anchors[(i - 1) * 8 : i * 8]
    for j, X in enumerate(anchors_mini):
        print("sample ", j)
        dict_tri[i][j] = {}
        A = rand_elims(data_no, [X])
        B = rand_elims(data_no, [X, A])
        param = random.randint(0, 1)
        if param == 0:
            A = X
        else:
            B = X
        dict_tri[i][j]["X"] = X
        dict_tri[i][j]["A"] = A
        dict_tri[i][j]["B"] = B
        print("X, A, B:", X, A, B)
# print(dict_tri)
with open("./metafile/samples_1.json", "w") as f:
    json.dump(dict_tri, f, indent=4)

# test2
print("test2")
dict_tri = {}
for i in range(1, 8):
    print("set ", i)
    dict_tri[i] = {}
    anchors_mini = anchors[(i - 1) * 8 : i * 8]
    for j, X in enumerate(anchors_mini):
        print("sample ", j)
        dict_tri[i][j] = {}
        A = rand_elims(data_no, [X])
        B = rand_elims(data_no, [X, A])
        dict_tri[i][j]["X"] = X
        dict_tri[i][j]["A"] = A
        dict_tri[i][j]["B"] = B
        print("X, A, B:", X, A, B)
# print(dict_tri)
with open("./metafile/samples_2.json", "w") as f:
    json.dump(dict_tri, f, indent=4)
