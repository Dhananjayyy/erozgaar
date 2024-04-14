FROM openjdk:17-alpine
WORKDIR /app
COPY backend/springboot/erozgaar/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
