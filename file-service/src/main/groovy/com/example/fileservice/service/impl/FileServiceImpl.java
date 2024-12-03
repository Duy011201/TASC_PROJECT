package com.example.fileservice.service.impl;

import com.example.fileservice.entity.FileEntity;
import com.example.fileservice.repository.FileRepository;
import com.example.fileservice.service.FileService;
import com.example.fileservice.util.HandleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static com.example.fileservice.config.Constant.*;

@Service
public class FileServiceImpl implements FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private FileRepository fileRepository;

    @Override
    public ResponseEntity<HandleResponse> uploadFile(MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), FILE_IS_EMPTY));
        }

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String originalFileName = file.getOriginalFilename();
            if (originalFileName == null) {
                return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), "File name is invalid"));
            }
            String sanitizedFileName = originalFileName.replaceAll(REX_FILENAME, "-");
            Path filePath = uploadPath.resolve(sanitizedFileName);
            Files.write(filePath, file.getBytes());

            FileEntity fileEntity = new FileEntity();
            fileEntity.setFileName(file.getOriginalFilename());
            fileEntity.setFilePath(filePath.toString());
            fileRepository.save(fileEntity);

            return ResponseEntity.ok(new HandleResponse<>(HttpStatus.OK.value(), UPLOAD_FILE_SUCCESS, fileEntity));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new HandleResponse<>(HttpStatus.BAD_REQUEST.value(), UPLOAD_FILE_FAIL));
        }
    }

    @Override
    public ResponseEntity<byte[]> downloadFile(String filePath) {
        try {
            String sanitizedFilename = filePath.replaceAll(REX_FILENAME, "");
            Path file = Paths.get(uploadDir).resolve(sanitizedFilename);

            if (!file.toAbsolutePath().startsWith(Paths.get(uploadDir).toAbsolutePath())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .header("Content-Type", "application/json")
                        .body(("Access denied: " + sanitizedFilename).getBytes());
            }

            if (!Files.exists(file)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .header("Content-Type", "application/json")
                        .body(("File not found: " + sanitizedFilename).getBytes());
            }

            byte[] fileBytes = Files.readAllBytes(file);

            String mimeType = Files.probeContentType(file);
            if (mimeType == null) {
                mimeType = "application/octet-stream";
            }

            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=\"" + sanitizedFilename + "\"")
                    .header("Content-Type", mimeType)
                    .body(fileBytes);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .header("Content-Type", "application/json")
                    .body((DOWNLOAD_FILE_FAIL).getBytes());
        }
    }
}
