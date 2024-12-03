package com.example.fileservice.service;

import com.example.fileservice.util.HandleResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FileService {
    ResponseEntity<HandleResponse> uploadFile(@RequestParam("file") MultipartFile file);
    ResponseEntity<byte[]> downloadFile(@PathVariable String filePath);
}
