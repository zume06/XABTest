import numpy as np
import soundfile as sf
import json
import random
import argparse


def rand_elims(start, end, elims):
    r = random.randint(start, end)
    while r in elims:
        r = random.randint(start, end)
    return r


fname_dataname = "test_redux_136"
with open("./metafile/jsons/{}.json".format(fname_dataname), "r") as f:
    data_no = json.load(f)

anchors = random.sample(data_no, 56)

# parser = argparse.ArgumentParser(description="select original file")
# parser.add_argument("--set", type=int)
# args = parser.parse_args()


dict_tri = {}
for i in range(7):
    print("set ", i)
    dict_tri[i] = {}
    anchors_mini = anchors[i * 8 : (i + 1) * 8]
    for j, X in enumerate(anchors_mini):
        print("sample ", j)
        dict_tri[i][j] = {}
        A = X
        B = rand_elims(min(data_no), max(data_no), [X, A])
        dict_tri[i][j]["X"] = X
        dict_tri[i][j]["A"] = A
        dict_tri[i][j]["B"] = B
        print("X, A, B:", X, A, B)
print(dict_tri)
with open("./metafile/samples_1.json", "w") as f:
    json.dump(dict_tri, f, indent=4)


dict_tri = {}
for i in range(7):
    print("set ", i)
    dict_tri[i] = {}
    anchors_mini = anchors[i * 8 : (i + 1) * 8]
    for j, X in enumerate(anchors_mini):
        print("sample ", j)
        dict_tri[i][j] = {}
        A = rand_elims(min(data_no), max(data_no), [X])
        B = rand_elims(min(data_no), max(data_no), [X, A])
        dict_tri[i][j]["X"] = X
        dict_tri[i][j]["A"] = A
        dict_tri[i][j]["B"] = B
        print("X, A, B:", X, A, B)
print(dict_tri)
with open("./metafile/samples_2.json", "w") as f:
    json.dump(dict_tri, f, indent=4)
