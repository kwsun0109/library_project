# 1단계: 빌드 스테이지 (JDK 21)
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src

# gradlew 파일에 실행 권한 부여
RUN chmod +x gradlew

RUN ./gradlew bootJar --no-daemon

# 2단계: 실행 스테이지 (JRE 21)
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]