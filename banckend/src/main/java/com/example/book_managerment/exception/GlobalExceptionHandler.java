package com.example.book_managerment.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * DTO 유효성 검증 실패 시(@Valid) 발생하는 예외 처리
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error -> {
            String fieldName = error.getField(); // 에러가 발생한 필드명 (예: title)
            String errorMessage = error.getDefaultMessage(); // DTO에 적어둔 message
            errors.put(fieldName, errorMessage);
        });

        // 400 Bad Request와 함께 어떤 필드가 왜 잘못되었는지 맵 형태로 반환
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
    }
}
