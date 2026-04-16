# Build stage
FROM maven:3.8.4-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8081
# Optimize memory for Render's 512MB limit
ENTRYPOINT ["java", "-Xmx350M", "-Xss512k", "-XX:ReservedCodeCacheSize=64M", "-XX:MaxMetaspaceSize=100M", "-jar", "app.jar"]
