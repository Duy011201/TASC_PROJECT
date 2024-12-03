package com.example.fileservice.util;

import java.lang.reflect.Field;

public class Common {
    public static void setFieldsToNull(Object obj, String... fieldNames) {
        if (obj == null || fieldNames == null) {
            throw new IllegalArgumentException("Object and field names cannot be null");
        }

        Class<?> clazz = obj.getClass();

        for (String fieldName : fieldNames) {
            try {
                Field field = clazz.getDeclaredField(fieldName);
                field.setAccessible(true);

                if (field.getType().isPrimitive()) {
                    throw new IllegalArgumentException("Cannot set primitive field to null: " + fieldName);
                }

                field.set(obj, null);

            } catch (NoSuchFieldException | IllegalAccessException e) {
                System.out.println("Error setting field " + fieldName + " to null: " + e.getMessage());
            }
        }
    }
}
