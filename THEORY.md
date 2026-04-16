ccпока ничего не создавай просто напиши предложение как это сделать# Теория для защиты лабораторной работы

## 1. Bulk операции

### Что это?
Bulk операции (массовые операции) — это операции, которые обрабатывают множество объектов за один запрос, вместо того чтобы обрабатывать их по одному.

### Зачем нужны?
- **Производительность**: Один запрос к БД вместо N запросов
- **Транзакционность**: Все объекты сохраняются в одной транзакции
- **Сетевые издержки**: Меньше HTTP-запросов между клиентом и сервером

### Пример в проекте
```java
@PostMapping("/bulk")
public ResponseEntity<List<FeatureResponseDTO>> createFeaturesBulk(
    @RequestBody List<FeatureCreateDTO> dtos) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(featureService.saveAll(dtos));
}
```

### Преимущества
- Уменьшение количества запросов к БД (с N до 1)
- Атомарность операций (все или ничего)
- Улучшение производительности при больших объемах данных

---

## 2. Stream API и лямбда-выражения

### Stream API
Stream API — это способ обработки коллекций в функциональном стиле (появился в Java 8).

### Основные операции
- **Промежуточные** (intermediate): `filter()`, `map()`, `sorted()`, `distinct()`
- **Терминальные** (terminal): `collect()`, `forEach()`, `reduce()`, `count()`

### Пример из проекта
```java
public List<FeatureResponseDTO> findAll() {
    return featureRepository.findAll()
        .stream()                           // создаем поток
        .map(featureMapper::toResponseDTO)  // преобразуем
        .toList();                          // собираем в список
}
```

### Лямбда-выражения
Лямбда — это анонимная функция, краткая запись функционального интерфейса.

**Синтаксис**: `(параметры) -> { тело }`

```java
// Было (анонимный класс)
list.forEach(new Consumer<String>() {
    public void accept(String s) {
        System.out.println(s);
    }
});

// Стало (лямбда)
list.forEach(s -> System.out.println(s));

// Или еще короче (method reference)
list.forEach(System.out::println);
```

### Преимущества Stream API
- Читаемость кода
- Декларативный стиль (что делать, а не как)
- Возможность параллельной обработки (`parallelStream()`)
- Ленивые вычисления (lazy evaluation)

---

## 3. Optional

### Что это?
`Optional<T>` — это контейнер, который может содержать или не содержать значение. Введен в Java 8 для борьбы с `NullPointerException`.

### Зачем нужен?
- Явно показывает, что значение может отсутствовать
- Заставляет обработать случай отсутствия значения
- Делает код более безопасным и читаемым

### Основные методы
```java
// Создание
Optional<String> opt1 = Optional.of("value");        // NPE если null
Optional<String> opt2 = Optional.ofNullable(value);  // безопасно
Optional<String> opt3 = Optional.empty();

// Проверка
opt.isPresent()   // есть ли значение
opt.isEmpty()     // пусто ли (Java 11+)

// Получение значения
opt.get()                              // небезопасно, может NPE
opt.orElse("default")                  // значение или default
opt.orElseGet(() -> getDefault())      // ленивое получение default
opt.orElseThrow(() -> new Exception()) // или исключение
```

### Пример из проекта
```java
@Transactional
public FeatureResponseDTO update(Long id, FeatureUpdateDTO dto) {
    Feature feature = featureRepository.findById(id)
        .orElseThrow(() -> new CarServiceException("Опция не найдена"));
    
    featureMapper.updateEntityFromDto(dto, feature);
    return featureMapper.toResponseDTO(featureRepository.save(feature));
}
```

### Антипаттерны (чего НЕ делать)
```java
// ❌ Плохо
if (optional.isPresent()) {
    return optional.get();
}

// ✅ Хорошо
return optional.orElse(defaultValue);
```

---

## 4. Пирамида тестирования и TDD

### Пирамида тестирования

```
        /\
       /E2E\         <- End-to-End (мало, медленные, дорогие)
      /------\
     /Integration\   <- Интеграционные (средне)
    /------------\
   /   Unit Tests  \ <- Юнит-тесты (много, быстрые, дешевые)
  /----------------\
```

### Принципы пирамиды
1. **Основа — Unit-тесты**: Много, быстрые, изолированные
2. **Середина — Integration**: Проверяют взаимодействие компонентов
3. **Вершина — E2E**: Мало, проверяют критические сценарии

### TDD (Test-Driven Development)

**Цикл Red-Green-Refactor**:
1. **Red**: Пишем тест, который падает (функционал еще не реализован)
2. **Green**: Пишем минимальный код, чтобы тест прошел
3. **Refactor**: Улучшаем код, тесты остаются зелеными

### Преимущества TDD
- Код изначально тестируемый
- Меньше багов
- Документация через тесты
- Уверенность при рефакторинге

### Недостатки TDD
- Требует дисциплины
- Медленнее на старте
- Не подходит для прототипирования

---

## 5. Unit vs Интеграционные тесты

### Unit-тесты (Модульные)

**Что тестируют**: Отдельный класс/метод в изоляции

**Характеристики**:
- Быстрые (миллисекунды)
- Изолированные (используют моки)
- Не требуют БД, сети, файловой системы
- Много (покрывают все ветки кода)

**Пример**:
```java
@ExtendWith(MockitoExtension.class)
class FeatureServiceTest {
    @Mock
    private FeatureRepository featureRepository;
    
    @Mock
    private FeatureMapper featureMapper;
    
    @InjectMocks
    private FeatureService featureService;
    
    @Test
    void create_ShouldReturnFeatureResponseDTO() {
        // Arrange
        FeatureCreateDTO createDTO = new FeatureCreateDTO("ABS");
        Feature feature = new Feature();
        when(featureMapper.toEntity(createDTO)).thenReturn(feature);
        when(featureRepository.save(feature)).thenReturn(feature);
        
        // Act
        FeatureResponseDTO result = featureService.create(createDTO);
        
        // Assert
        assertNotNull(result);
        verify(featureRepository).save(feature);
    }
}
```

### Интеграционные тесты

**Что тестируют**: Взаимодействие нескольких компонентов

**Характеристики**:
- Медленнее (секунды)
- Используют реальные зависимости (БД, Spring Context)
- Меньше, чем unit-тестов
- Проверяют реальную интеграцию

**Пример**:
```java
@SpringBootTest
@AutoConfigureMockMvc
class FeatureControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    void createFeature_ShouldReturn201() throws Exception {
        mockMvc.perform(post("/api/feature")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"ABS\"}"))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value("ABS"));
    }
}
```

### Сравнение

| Критерий | Unit | Integration |
|----------|------|-------------|
| Скорость | Очень быстрые | Медленные |
| Изоляция | Полная (моки) | Частичная/нет |
| Покрытие | Детальное | Общее |
| Количество | Много | Мало |
| Сложность | Простые | Сложнее |
| Цель | Логика метода | Взаимодействие |

---

## 6. JUnit

### Что это?
JUnit — это фреймворк для написания и запуска тестов в Java. Текущая версия — JUnit 5 (Jupiter).

### Основные аннотации

```java
@Test                    // Помечает метод как тест
@BeforeEach             // Выполняется перед каждым тестом
@AfterEach              // Выполняется после каждого теста
@BeforeAll              // Один раз перед всеми тестами (static)
@AfterAll               // Один раз после всех тестов (static)
@Disabled               // Отключить тест
@DisplayName("Описание") // Человекочитаемое имя теста
@ParameterizedTest      // Параметризованный тест
```

### Assertions (Утверждения)

```java
// Базовые
assertEquals(expected, actual);
assertNotEquals(unexpected, actual);
assertTrue(condition);
assertFalse(condition);
assertNull(object);
assertNotNull(object);

// Исключения
assertThrows(Exception.class, () -> {
    // код, который должен выбросить исключение
});

// Группировка
assertAll(
    () -> assertEquals(1, result.getId()),
    () -> assertEquals("Name", result.getName())
);
```

### Структура теста (AAA Pattern)

```java
@Test
void testName() {
    // Arrange (Подготовка)
    User user = new User("John");
    
    // Act (Действие)
    String result = user.getName();
    
    // Assert (Проверка)
    assertEquals("John", result);
}
```

---

## 7. Mockito

### Что это?
Mockito — это фреймворк для создания mock-объектов (заглушек) в тестах.

### Зачем нужны моки?
- Изолировать тестируемый класс от зависимостей
- Контролировать поведение зависимостей
- Проверять взаимодействие между объектами

### Основные аннотации

```java
@Mock                // Создает мок-объект
@InjectMocks         // Создает объект и внедряет в него моки
@Spy                 // Частичный мок (реальный объект + моки)
@Captor              // Захватывает аргументы методов
```

### Настройка поведения (Stubbing)

```java
// Возврат значения
when(repository.findById(1L)).thenReturn(Optional.of(entity));

// Выброс исключения
when(repository.save(any())).thenThrow(new RuntimeException());

// Разное поведение при повторных вызовах
when(service.get()).thenReturn(1).thenReturn(2).thenThrow(Exception.class);

// Для void-методов
doNothing().when(repository).delete(any());
doThrow(Exception.class).when(repository).delete(any());
```

### Проверка вызовов (Verification)

```java
// Был ли вызван метод
verify(repository).save(entity);

// Количество вызовов
verify(repository, times(2)).save(any());
verify(repository, never()).delete(any());
verify(repository, atLeastOnce()).findAll();

// Проверка аргументов
verify(repository).save(argThat(e -> e.getName().equals("Test")));
```

### ArgumentMatchers

```java
any()           // любой объект
any(Class.class) // любой объект указанного типа
eq(value)       // точное совпадение
anyString()     // любая строка
anyInt()        // любое число
isNull()        // null
isNotNull()     // не null
```

### Пример полного теста

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private UserMapper userMapper;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void createUser_ShouldSaveAndReturnDTO() {
        // Arrange
        UserCreateDTO createDTO = new UserCreateDTO("John", "+123456");
        User user = new User();
        user.setName("John");
        User savedUser = new User();
        savedUser.setId(1L);
        savedUser.setName("John");
        UserResponseDTO responseDTO = new UserResponseDTO(1L, "John", "+123456", null);
        
        when(userMapper.toEntity(createDTO)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(savedUser);
        when(userMapper.toResponseDTO(savedUser)).thenReturn(responseDTO);
        
        // Act
        UserResponseDTO result = userService.create(createDTO);
        
        // Assert
        assertNotNull(result);
        assertEquals(1L, result.id());
        assertEquals("John", result.name());
        
        // Verify
        verify(userRepository).save(user);
        verify(userMapper).toEntity(createDTO);
        verify(userMapper).toResponseDTO(savedUser);
    }
    
    @Test
    void updateUser_ShouldThrowException_WhenNotFound() {
        // Arrange
        Long id = 1L;
        UserUpdateDTO updateDTO = new UserUpdateDTO("John", "+123456", null);
        when(userRepository.findById(id)).thenReturn(Optional.empty());
        
        // Act & Assert
        assertThrows(CarServiceException.class, 
            () -> userService.update(id, updateDTO));
        
        verify(userRepository, never()).save(any());
    }
}
```

---

## Вопросы для защиты

### По Bulk операциям
1. **Зачем нужны bulk-операции?** — Производительность, меньше запросов к БД
2. **Как обеспечить транзакционность?** — Аннотация `@Transactional`
3. **Что произойдет без @Transactional?** — Часть данных может сохраниться, даже если произошла ошибка

### По Stream API
1. **В чем разница между промежуточными и терминальными операциями?** — Промежуточные возвращают Stream (ленивые), терминальные — результат (запускают выполнение)
2. **Что такое ленивые вычисления?** — Операции не выполняются до вызова терминальной операции
3. **Зачем нужны лямбды?** — Краткая запись функциональных интерфейсов, улучшение читаемости

### По Optional
1. **Зачем нужен Optional?** — Избежать NullPointerException, явно показать возможность отсутствия значения
2. **Разница между orElse и orElseGet?** — `orElse` всегда вычисляет значение, `orElseGet` — только если Optional пустой
3. **Почему не стоит использовать Optional.get()?** — Может выбросить NoSuchElementException, лучше использовать orElse/orElseThrow

### По тестированию
1. **Что такое пирамида тестирования?** — Концепция: много unit-тестов, меньше интеграционных, еще меньше E2E
2. **В чем разница между unit и интеграционными тестами?** — Unit изолированные с моками, интеграционные проверяют взаимодействие реальных компонентов
3. **Что такое TDD?** — Разработка через тестирование: сначала тест, потом код
4. **Зачем нужны моки?** — Изолировать тестируемый класс, контролировать поведение зависимостей
5. **Что проверяет verify() в Mockito?** — Был ли вызван метод мока и с какими аргументами

---

## Паттерны проектирования (Design Patterns)

### Основные категории

1. **Порождающие (Creational)** — создание объектов
   - Singleton, Factory, Builder, Prototype

2. **Структурные (Structural)** — композиция классов и объектов
   - Adapter, Decorator, Proxy, Facade

3. **Поведенческие (Behavioral)** — взаимодействие объектов
   - Strategy, Observer, Template Method, Command

### Примеры в проекте

**Builder** — используется в DTO с Lombok:
```java
@Builder
public record UserResponseDTO(Long id, String name, String phone, List<AdvertisementResponseDTO> ads) {}
```

**Repository Pattern** — Spring Data JPA:
```java
public interface FeatureRepository extends JpaRepository<Feature, Long> {}
```

**Dependency Injection** — Spring:
```java
@RequiredArgsConstructor
public class FeatureService {
    private final FeatureRepository featureRepository;
    private final FeatureMapper featureMapper;
}
```

**DTO Pattern** — разделение слоев:
- `FeatureCreateDTO` — для создания
- `FeatureUpdateDTO` — для обновления
- `FeatureResponseDTO` — для ответа

---

## Полезные ссылки

- [Refactoring Guru - Паттерны проектирования](https://refactoring.guru/ru/design-patterns/java)
- [JUnit 5 Documentation](https://junit.org/junit5/docs/current/user-guide/)
- [Mockito Documentation](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/Mockito.html)
- [Stream API Guide](https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html)
- [Optional Guide](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html)