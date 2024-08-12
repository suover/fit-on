FROM openjdk:17-alpine
ARG JAR_FILE=build/libs/*.jar
ARG PROFILES
ARG ENV
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE}", "-Dserver.env=${SERVER_ENV}", "-jar", "/app.jar"]
