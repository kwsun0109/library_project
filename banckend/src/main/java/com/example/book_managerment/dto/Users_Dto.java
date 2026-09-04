package com.example.book_managerment.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class Users_Dto {

    @Email(message = "올바른 이메일 형식이 아닙니다.")
    @NotBlank(message = "이 메일은 필수 입력 값 입니다.")
    private String email;

    @NotBlank (message = "비밀번호는 필수 값 입니다.")
    @Size(min = 4, max = 20, message = "비밀번호는 4자 이상이어야 합니다.")
    private String password;

    @NotBlank (message = "이름은 필수 입력값입니다.")
    private String name;

}
