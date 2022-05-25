package com.devmountain.myGainsJournal.controllers;


import com.devmountain.myGainsJournal.dtos.UserDto;
import com.devmountain.myGainsJournal.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public List<String> addUser(@RequestBody UserDto userDto) {
        String passHash = passwordEncoder.encode(userDto.getPassword());
        userDto.setPassword(passHash);
        return userService.addUser(userDto);
    }

    @PostMapping(value = "/login", produces = "application/json", consumes = "application/json")
    public ResponseEntity<List<String>> userLogin(@RequestBody UserDto userDto) {
//        return userService.userLogin(userDto);
        System.out.println("username="+ userDto.getUsername());
        System.out.println("password="+ userDto.getPassword());
        return new ResponseEntity<>(userService.userLogin(userDto), HttpStatus.OK);
    }
//    ResponseEntity<List<String>>
//    return new ResponseEntity<>(xxx, HttpStatus.OK);
}
