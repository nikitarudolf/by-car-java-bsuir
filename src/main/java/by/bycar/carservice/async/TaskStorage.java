package by.bycar.carservice.async;

import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentHashMap;

@Component
public class TaskStorage {
    private final ConcurrentHashMap<String, ModerationTask> tasks = new ConcurrentHashMap<>();

    public void save(ModerationTask task) {
        tasks.put(task.getTaskId(), task);
    }

    public ModerationTask get(String taskId) {
        return tasks.get(taskId);
    }

    public void update(String taskId, ModerationTask task) {
        tasks.put(taskId, task);
    }
}
