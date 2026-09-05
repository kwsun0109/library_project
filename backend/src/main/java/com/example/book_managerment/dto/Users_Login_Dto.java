package com.example.book_managerment.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
public class Users_Login_Dto {

    @NotBlank (message = "이 메일을 입력해주세요.")
    private String email;

    @NotBlank (message = "비밀번호를 입력해주세요.")
    private String password;
    
}
