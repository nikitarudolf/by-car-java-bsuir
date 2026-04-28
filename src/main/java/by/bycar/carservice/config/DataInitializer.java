package by.bycar.carservice.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final DataSource dataSource;

    @Override
    public void run(String... args) {
        try {
            log.info("Starting database initialization with data.sql...");
            ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
            populator.addScript(new ClassPathResource("data.sql"));
            populator.setContinueOnError(false);
            populator.execute(dataSource);
            log.info("Database initialization completed successfully!");
        } catch (Exception e) {
            log.error("Failed to initialize database: " + e.getMessage(), e);
        }
    }
}
