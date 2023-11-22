import json
import numpy as np
import soundfile as sf
import random
import os

thres = 0.0001
with open("./metafile/samples_1.json", "r") as f:
    dict_test1 = json.load(f)

with open("./metafile/samples_2.json", "r") as f:
    dict_test2 = json.load(f)

for set in range(len(dict_test1)):
    print("set", set)
    dir = "./wav/set{}".format(set)
    for i in range(len(dict_test1[str(set)]) // 2 + 1):
        print("no.", i)
        for inst in ["drums", "bass", "piano", "guitar", "residuals"]:
            print(inst)
            # test1
            print("test1")
            X = dict_test1[str(set)][str(i)]["X"]
            A = dict_test1[str(set)][str(i)]["A"]
            B = dict_test1[str(set)][str(i)]["B"]
            wav_X, sr = sf.read("/nas03/assets/Dataset/slakh-2100_2/Track0{}/submixes/{}.wav".format(X, inst))
            wav_A, sr = sf.read("/nas03/assets/Dataset/slakh-2100_2/Track0{}/submixes/{}.wav".format(A, inst))
            wav_B, sr = sf.read("/nas03/assets/Dataset/slakh-2100_2/Track0{}/submixes/{}.wav".format(B, inst))
            print(X)
            sound = False
            while sound == False:
                segX = random.randint(0, (len(wav_X) // sr) - 5)
                inst_wav_cutX = wav_X[segX * sr : (segX + 5) * sr]
                Amp = np.abs(inst_wav_cutX)
                Pow = np.mean(Amp**2)
                if Pow > thres:
                    sound = True
            print(A)
            sound = False
            while sound == False or segX == segA:
                segA = random.randint(0, (len(wav_A) // sr) - 5)
                inst_wav_cutA = wav_A[segA * sr : (segA + 5) * sr]
                Amp = np.abs(inst_wav_cutA)
                Pow = np.mean(Amp**2)
                if Pow > thres:
                    sound = True
            print(B)
            sound = False
            while sound == False:
                segB = random.randint(0, (len(wav_B) // sr) - 5)
                inst_wav_cutB = wav_X[segB * sr : (segB + 5) * sr]
                Amp = np.abs(inst_wav_cutB)
                Pow = np.mean(Amp**2)
                if Pow > thres:
                    sound = True
            os.makedirs("{}/{}_X".format(dir, inst), exist_ok=True)
            os.makedirs("{}/{}_A".format(dir, inst), exist_ok=True)
            os.makedirs("{}/{}_B".format(dir, inst), exist_ok=True)
            X_path = "{}/{}_X/cut{}_{}.wav".format(dir, inst, X, segX)
            A_path = "{}/{}_A/cut{}_{}.wav".format(dir, inst, A, segA)
            B_path = "{}/{}_B/cut{}_{}.wav".format(dir, inst, B, segB)
            sf.write(X_path, inst_wav_cutX, sr)
            sf.write(A_path, inst_wav_cutA, sr)
            sf.write(B_path, inst_wav_cutB, sr)
            with open("{}/{}_X.list".format(dir, inst), mode="a") as f:
                f.write(X_path)
                f.write("\n")
            with open("{}/{}_A.list".format(dir, inst), mode="a") as f:
                f.write(A_path)
                f.write("\n")
            with open("{}/{}_B.list".format(dir, inst), mode="a") as f:
                f.write(B_path)
                f.write("\n")

            # test2
            print("test2")
            # X = dict_test2[str(set)][str(i)]["X"]
            A = dict_test2[str(set)][str(i)]["A"]
            B = dict_test2[str(set)][str(i)]["B"]
            # wav_X, sr = sf.read("/nas03/assets/Dataset/slakh-2100_2/Track0{}/submixes/{}.wav".format(X, inst))
            wav_A, sr = sf.read("/nas03/assets/Dataset/slakh-2100_2/Track0{}/submixes/{}.wav".format(A, inst))
            wav_B, sr = sf.read("/nas03/assets/Dataset/slakh-2100_2/Track0{}/submixes/{}.wav".format(B, inst))
            """
            sound = False
            while sound == False:
                segX = random.randint(0, (len(wav_X) // sr) - 5)
                inst_wav_cutX = wav_X[segX * sr : (segX + 5) * sr]
                Amp = np.abs(inst_wav_cutX)
                Pow = np.mean(Amp**2)
                if Pow > thres:
                    sound = True
            """
            print(A)
            sound = False
            while sound == False:
                segA = random.randint(0, (len(wav_A) // sr) - 5)
                inst_wav_cutA = wav_A[segA * sr : (segA + 5) * sr]
                Amp = np.abs(inst_wav_cutA)
                Pow = np.mean(Amp**2)
                if Pow > thres:
                    sound = True
            print(B)
            sound = False
            while sound == False:
                segB = random.randint(0, (len(wav_B) // sr) - 5)
                inst_wav_cutB = wav_X[segB * sr : (segB + 5) * sr]
                Amp = np.abs(inst_wav_cutB)
                Pow = np.mean(Amp**2)
                if Pow > thres:
                    sound = True
            X_path = "{}/{}_X/cut{}_{}.wav".format(dir, inst, X, segX)
            A_path = "{}/{}_A/cut{}_{}.wav".format(dir, inst, A, segA)
            B_path = "{}/{}_B/cut{}_{}.wav".format(dir, inst, B, segB)
            # sf.write(X_path, inst_wav_cutX, sr)
            sf.write(A_path, inst_wav_cutA, sr)
            sf.write(B_path, inst_wav_cutB, sr)
            with open("{}/{}_X.list".format(dir, inst), mode="a") as f:
                f.write(X_path)
                f.write("\n")
            with open("{}/{}_A.list".format(dir, inst), mode="a") as f:
                f.write(A_path)
                f.write("\n")
            with open("{}/{}_B.list".format(dir, inst), mode="a") as f:
                f.write(B_path)
                f.write("\n")

    dir = "./wav/set{}".format(set + 10)
    for i in range(len(dict_test1[str(set)]) // 2, len(dict_test1[str(set)])):
        print("no.", i)
        for inst in ["drums", "bass", "piano", "guitar", "residuals"]:
            print(inst)
            # test1
            print("test1")
            X = dict_test1[str(set)][str(i)]["X"]
            A = dict_test1[str(set)][str(i)]["A"]
            B = dict_test1[str(set)][str(i)]["B"]
            wav_X, sr = sf.read("/nas03/assets/Dataset/slakh-2100_2/Track0{}/submixes/{}.wav".format(X, inst))
            wav_A, sr = sf.read("/nas03/assets/Dataset/slakh-2100_2/Track0{}/submixes/{}.wav".format(A, inst))
            wav_B, sr = sf.read("/nas03/assets/Dataset/slakh-2100_2/Track0{}/submixes/{}.wav".format(B, inst))
            print(X)
            sound = False
            while sound == False:
                segX = random.randint(0, (len(wav_X) // sr) - 5)
                inst_wav_cutX = wav_X[segX * sr : (segX + 5) * sr]
                Amp = np.abs(inst_wav_cutX)
                Pow = np.mean(Amp**2)
                if Pow > thres:
                    sound = True
            print(A)
            sound = False
            while sound == False or segX == segA:
                segA = random.randint(0, (len(wav_A) // sr) - 5)
                inst_wav_cutA = wav_A[segA * sr : (segA + 5) * sr]
                Amp = np.abs(inst_wav_cutA)
                Pow = np.mean(Amp**2)
                if Pow > thres:
                    sound = True
            print(B)
            sound = False
            while sound == False:
                segB = random.randint(0, (len(wav_B) // sr) - 5)
                inst_wav_cutB = wav_X[segB * sr : (segB + 5) * sr]
                Amp = np.abs(inst_wav_cutB)
                Pow = np.mean(Amp**2)
                if Pow > thres:
                    sound = True
            os.makedirs("{}/{}_X".format(dir, inst), exist_ok=True)
            os.makedirs("{}/{}_A".format(dir, inst), exist_ok=True)
            os.makedirs("{}/{}_B".format(dir, inst), exist_ok=True)
            X_path = "{}/{}_X/cut{}_{}.wav".format(dir, inst, X, segX)
            A_path = "{}/{}_A/cut{}_{}.wav".format(dir, inst, A, segA)
            B_path = "{}/{}_B/cut{}_{}.wav".format(dir, inst, B, segB)
            sf.write(X_path, inst_wav_cutX, sr)
            sf.write(A_path, inst_wav_cutA, sr)
            sf.write(B_path, inst_wav_cutB, sr)
            with open("{}/{}_X.list".format(dir, inst), mode="a") as f:
                f.write(X_path)
                f.write("\n")
            with open("{}/{}_A.list".format(dir, inst), mode="a") as f:
                f.write(A_path)
                f.write("\n")
            with open("{}/{}_B.list".format(dir, inst), mode="a") as f:
                f.write(B_path)
                f.write("\n")

            # test2
            print("test2")
            # X = dict_test2[str(set)][str(i)]["X"]
            A = dict_test2[str(set)][str(i)]["A"]
            B = dict_test2[str(set)][str(i)]["B"]
            # wav_X, sr = sf.read("/nas03/assets/Dataset/slakh-2100_2/Track0{}/submixes/{}.wav".format(X, inst))
            wav_A, sr = sf.read("/nas03/assets/Dataset/slakh-2100_2/Track0{}/submixes/{}.wav".format(A, inst))
            wav_B, sr = sf.read("/nas03/assets/Dataset/slakh-2100_2/Track0{}/submixes/{}.wav".format(B, inst))
            """
            sound = False
            while sound == False:
                segX = random.randint(0, (len(wav_X) // sr) - 5)
                inst_wav_cutX = wav_X[segX * sr : (segX + 5) * sr]
                Amp = np.abs(inst_wav_cutX)
                Pow = np.mean(Amp**2)
                if Pow > thres:
                    sound = True
            """
            print(A)
            sound = False
            while sound == False:
                segA = random.randint(0, (len(wav_A) // sr) - 5)
                inst_wav_cutA = wav_A[segA * sr : (segA + 5) * sr]
                Amp = np.abs(inst_wav_cutA)
                Pow = np.mean(Amp**2)
                if Pow > thres:
                    sound = True
            print(B)
            sound = False
            while sound == False:
                segB = random.randint(0, (len(wav_B) // sr) - 5)
                inst_wav_cutB = wav_X[segB * sr : (segB + 5) * sr]
                Amp = np.abs(inst_wav_cutB)
                Pow = np.mean(Amp**2)
                if Pow > thres:
                    sound = True
            X_path = "{}/{}_X/cut{}_{}.wav".format(dir, inst, X, segX)
            A_path = "{}/{}_A/cut{}_{}.wav".format(dir, inst, A, segA)
            B_path = "{}/{}_B/cut{}_{}.wav".format(dir, inst, B, segB)
            # sf.write(X_path, inst_wav_cutX, sr)
            sf.write(A_path, inst_wav_cutA, sr)
            sf.write(B_path, inst_wav_cutB, sr)
            with open("{}/{}_X.list".format(dir, inst), mode="a") as f:
                f.write(X_path)
                f.write("\n")
            with open("{}/{}_A.list".format(dir, inst), mode="a") as f:
                f.write(A_path)
                f.write("\n")
            with open("{}/{}_B.list".format(dir, inst), mode="a") as f:
                f.write(B_path)
                f.write("\n")
