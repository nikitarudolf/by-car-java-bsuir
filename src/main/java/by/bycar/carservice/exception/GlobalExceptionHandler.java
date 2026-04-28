package by.bycar.carservice.exception;

import by.bycar.carservice.dto.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidationExceptions(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, String> errors = new HashMap<>();

        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        log.error("400_BAD_REQUEST: Validation failed " + request.getRequestURI());
        return new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                "Validation Failed",
                "Переданы некорректные данные",
                request.getRequestURI(),
                errors
        );
    }

    @ExceptionHandler(CarServiceException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleEntityNotFound(CarServiceException ex, HttpServletRequest request) {
        log.error("404_NOT_FOUND " + ex.getMessage() + " " + request.getRequestURI());
        return new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                "Not Found",
                ex.getMessage(),
                request.getRequestURI(),
                null
        );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleDataIntegrityViolation(DataIntegrityViolationException ex, HttpServletRequest request) {
        String message = "Невозможно удалить запись, так как она используется в других данных";

        // Проверяем, что это именно foreign key constraint
        if (ex.getMessage() != null && ex.getMessage().contains("foreign key constraint")) {
            if (ex.getMessage().contains("features")) {
                message = "Невозможно удалить характеристику, так как она используется в автомобилях";
            } else if (ex.getMessage().contains("brands")) {
                message = "Невозможно удалить бренд, так как у него есть модели";
            } else if (ex.getMessage().contains("models")) {
                message = "Невозможно удалить модель, так как она используется в автомобилях";
            }
        }

        log.error("409_CONFLICT " + ex.getMessage() + " " + request.getRequestURI());
        return new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.CONFLICT.value(),
                "Conflict",
                message,
                request.getRequestURI(),
                null
        );
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleAllExceptions(Exception ex, HttpServletRequest request) {
        log.error("500_INTERNAL_SERVER_ERROR " + ex.getMessage() + " " + request.getRequestURI());
        return new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Internal Server Error",
                "Произошла внутренняя ошибка сервера. Попробуйте позже.",
                request.getRequestURI(),
                null
        );
    }
}