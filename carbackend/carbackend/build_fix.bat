@echo off
set "JAVA_HOME=C:\Program Files\Java\jdk-23"
set "PATH=%JAVA_HOME%\bin;%PATH%"
echo Using JAVA_HOME: %JAVA_HOME%
java -version
call mvnw.cmd compile -Dmaven.test.skip=true
