from tensorflow.keras.models import load_model
import numpy as np
import sys
import os
import cv2
import urllib.parse
import logging


DIGITS = 3			# number of probability digits
#END_CHAR = "<br/>"  # end of print character
END_CHAR = "\n"	# end of print character


def get_labels():
	labels = [
		'ゲルトルート・バルクホルン',
	 	'シャーロット・E・イェーガー', 
		'エイラ・イルマタル・ユーティライネン',
        'エーリカ・ハルトマン', 
		'フランチェスカ・ルッキーニ', 
		'リネット・ビショップ', 
		'ミーナ・ディートリンデ・ヴィルケ',
        '宮藤芳佳', 
		'ペリーヌ・クロステルマン', 
		'坂本美緒', 
		'サーニャ・V・リトヴャク']
	return np.array(labels)


def main(argv):
	if not os.path.isfile(argv[1]):
		print("error: invalid model path", end=END_CHAR)
		return
	model_path = argv[1]

	_, ext = os.path.splitext(argv[2])
	if not ext.lower() in [".jpg", ".jpeg", ".png", ".bmp"]:
		print("error: unsupport file extension", end=END_CHAR)
		return

	try:
		img = cv2.imread(argv[2])
		img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
		if not img.shape == (72, 72, 3):
			img = cv2.resize(img, dsize=(72, 72))
		#print(img.shape)
		#cv2.imshow("debug", img)
		#cv2.waitKey()
		## load network model
		model = load_model(model_path, compile=False)
		#print(model.summary())
		predict = model.predict(np.array([img]) / np.float(255))
		labels = get_labels()
		## set output digits and zero padding
		#np.set_printoptions(precision=DIGITS, floatmode='fixed')
		index = np.argmax(predict)
		probability = str(np.round(predict[0][index]*100, DIGITS))
		msg = labels[index] + "  (" + probability + "%)"
		print(urllib.parse.quote(msg), end=END_CHAR)
		#print("probability:", np.round(predict[0], DIGITS), end=END_CHAR)
		#print("class:", labels[np.argmax(predict)], end=END_CHAR)
	except:
		#import traceback
		#traceback.print_exc()
		print("error: unknown error", end=END_CHAR)


if __name__ == "__main__":
	if len(sys.argv) < 3:
		print("error: invalid args num", end=END_CHAR)
	else:
		# disable GPU information
		os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
		# disable keras worning
		logging.getLogger('tensorflow').disabled = True
		main(sys.argv)
