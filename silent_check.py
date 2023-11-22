import numpy as np
import json
import os
import random
import soundfile as sf

fname_dataname = "test_redux_136"
with open("./metafile/jsons/{}.json".format(fname_dataname), "r") as f:
    data_no = json.load(f)

"""
for inst in ["drums", "bass", "piano", "guitar", "residuals"]:
    print(inst)
    for track in data_no:
        print(track)
        for i in range(100):
            path = "/nas03/assets/Dataset/slakh/cutwave/10s_on10.0/{}/wave{}_{}.npz".format(inst, track, i)
            if os.path.exists(path):
                npz = np.load(path)
                if npz["sound"]:
                    print(True)
                    break
"""
thres = 0.0001
for inst in ["drums", "bass", "piano", "guitar", "residuals"]:
    for track in data_no:
        print(track)
        wav_X, sr = sf.read("/nas03/assets/Dataset/slakh-2100_2/Track0{}/submixes/{}.wav".format(track, inst))
        sound = False
        while sound == False:
            segX = random.randint(0, (len(wav_X) // sr) - 5)
            inst_wav_cutX = wav_X[segX * sr : (segX + 5) * sr]
            Amp = np.abs(inst_wav_cutX)
            Pow = np.mean(Amp**2)
            if Pow > thres:
                sound = True
