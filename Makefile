clean all:
	rm -rf node_modules package-lock.json android/build android/app/build

rebuild :
	make clean all && npm i && cd android && ./gradlew clean && ./gradlew :app:bundleRelease