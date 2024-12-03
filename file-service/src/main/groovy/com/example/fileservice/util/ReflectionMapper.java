package com.example.fileservice.util;

import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Field;
import java.util.List;

@Slf4j
public class ReflectionMapper {
    public static <T> T map(Object source, Class<T> targetClass) {
        try {
            T targetObject = targetClass.getDeclaredConstructor().newInstance();
            Field[] fields = targetClass.getDeclaredFields();

            for (Field targetField : fields) {
                targetField.setAccessible(true);
                Field sourceField = source.getClass().getDeclaredField(targetField.getName());
                sourceField.setAccessible(true);

                if (sourceField.get(source) != null) {
                    targetField.set(targetObject, sourceField.get(source));
                }
            }
            return targetObject;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("Error mapper reflection mapper", e.getMessage());
        }
        return null;
    }
    public static <S, T> List<T> mapList(List<S> source, Class<T> targetClass) {
        return source.stream()
                .map(entity -> ReflectionMapper.map(entity, targetClass))
                .toList();
    }
}
