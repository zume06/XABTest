for set in range(1, 8):
    dir = "./wav/set{}".format(set)
    # for inst in ["drums", "bass", "piano", "guitar", "residuals"]:
    for inst in ["residuals"]:
        with open("{}/{}_X.list".format(dir, inst), mode="a") as f:
            f.write("0")
        with open("{}/{}_A.list".format(dir, inst), mode="a") as f:
            f.write("0")
        with open("{}/{}_B.list".format(dir, inst), mode="a") as f:
            f.write("0")
for set in range(11, 18):
    dir = "./wav/set{}".format(set)
    # for inst in ["drums", "bass", "piano", "guitar", "residuals"]:
    for inst in ["residuals"]:
        with open("{}/{}_X.list".format(dir, inst), mode="a") as f:
            f.write("0")
        with open("{}/{}_A.list".format(dir, inst), mode="a") as f:
            f.write("0")
        with open("{}/{}_B.list".format(dir, inst), mode="a") as f:
            f.write("0")
