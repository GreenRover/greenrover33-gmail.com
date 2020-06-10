FROM maven:3.6-openjdk-11 as builder
WORKDIR /app
COPY . /app
RUN mvn package

FROM openjdk:11-jre-slim
WORKDIR /app
COPY --from=builder /app/target/*.jar /app/app.jar
CMD ["java", "-jar", "/app/app.jar"]
