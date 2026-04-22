# ByCar Frontend - React SPA Client

React-based Single Page Application for the ByCar car advertisement platform.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Backend API running on `http://localhost:8080`

### Installation

```bash
cd frontend
npm install
npm start
```

The application will open at `http://localhost:3000`

## 📋 Features Implemented

### ✅ CRUD Operations
- **Advertisements**: Create, Read, Update, Delete
- **Brands**: Create, Read, Update, Delete
- **Models**: Create, Read, Update, Delete
- **Features**: Create, Read, Update, Delete

### ✅ Relationship Demonstrations

#### OneToMany Relationships:
1. **Brand → Models**
   - Location: `/brands` page
   - Select a brand in the left column to see its models in the right column

2. **Advertisement → Photos**
   - Location: Advertisement details page (`/advertisements/:id`)
   - Photo gallery showing all photos for an advertisement

#### ManyToMany Relationships:
1. **Car ↔ Features**
   - **Creation**: `/advertisements/create` - Checkbox list to select multiple features
   - **Display**: `/advertisements/:id` - Feature badges showing selected features
   - **Preview**: Search results show first 2-3 features

### ✅ Search & Filtering
- Filter by Brand
- Filter by Price range (min/max)
- Filter by Year range (min/max)
- Pagination support (12 items per page)
- Results count display

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/                      # API service layer
│   │   ├── axiosConfig.js        # Axios instance configuration
│   │   ├── advertisementService.js
│   │   ├── brandService.js
│   │   ├── modelService.js
│   │   ├── featureService.js
│   │   ├── photoService.js
│   │   ├── favoriteService.js
│   │   ├── userService.js
│   │   └── moderationService.js
│   ├── components/               # React components
│   │   ├── BrandManagement.js    # Brand & Model CRUD (OneToMany demo)
│   │   ├── FeatureManagement.js  # Feature CRUD
│   │   ├── AdvertisementForm.js  # Create/Edit ads (ManyToMany demo)
│   │   ├── AdvertisementDetails.js # Ad details (relationships display)
│   │   ├── AdvertisementList.js  # Simple list view
│   │   └── AdvertisementSearch.js # Search with filters & pagination
│   ├── constants/
│   │   └── enums.js              # Enum definitions
│   ├── App.js                    # Main app with routing
│   ├── index.js                  # Entry point
│   └── index.css                 # Global styles
└── package.json
```

## 🔗 API Endpoints Used

### Advertisements
- `GET /api/advertisements` - Get all
- `GET /api/advertisements/{id}` - Get by ID
- `POST /api/advertisements` - Create
- `PATCH /api/advertisements/{id}` - Update
- `DELETE /api/advertisements/{id}` - Delete
- `GET /api/advertisements/search` - Search with filters & pagination

### Brands
- `GET /api/brands` - Get all
- `POST /api/brands` - Create
- `PATCH /api/brands/{id}` - Update
- `DELETE /api/brands/{id}` - Delete

### Models
- `GET /api/models` - Get all
- `POST /api/models` - Create
- `PATCH /api/models/{id}` - Update
- `DELETE /api/models/{id}` - Delete

### Features
- `GET /api/feature` - Get all
- `POST /api/feature` - Create
- `PATCH /api/feature/{id}` - Update
- `DELETE /api/feature/{id}` - Delete

### Photos
- `GET /api/photos/advertisement/{id}` - Get photos for advertisement
- `POST /api/photos/advertisement/{id}` - Add photo
- `DELETE /api/photos/{id}` - Delete photo

## 🎯 Laboratory Requirements Checklist

- ✅ **SPA Client**: React application with routing
- ✅ **API Integration**: All CRUD operations connected to backend
- ✅ **OneToMany Display**: 
  - Brand → Models (interactive selection)
  - Advertisement → Photos (gallery view)
- ✅ **ManyToMany Display**: 
  - Car ↔ Features (checkbox selection + badge display)
- ✅ **CRUD Operations**: Full CRUD for Advertisements, Brands, Models, Features
- ✅ **Filtering**: Search by Brand, Price, Year with pagination

## 📱 Pages Overview

### 1. Home (`/`)
- Welcome page with navigation links
- Overview of features and relationships

### 2. Search (`/search`)
- **Filter sidebar**: Brand, Price range, Year range
- **Results grid**: Card-based layout with pagination
- **Demonstrates**: Filtering and pagination

### 3. Advertisements (`/advertisements`)
- Simple list of all advertisements
- Quick actions: View, Edit, Delete

### 4. Create/Edit Advertisement (`/advertisements/create`, `/advertisements/edit/:id`)
- **Brand & Model selection** (cascading dropdowns)
- Car details (year, mileage, VIN)
- **Feature selection** (checkboxes - ManyToMany)
- Description and price
- **Demonstrates**: ManyToMany relationship creation

### 5. Advertisement Details (`/advertisements/:id`)
- Full car information
- **Photo gallery** (OneToMany display)
- **Feature badges** (ManyToMany display)
- Seller information
- **Demonstrates**: Both OneToMany and ManyToMany relationships

### 6. Brands & Models (`/brands`)
- Two-column layout
- **Left**: Brand list
- **Right**: Models for selected brand
- **Demonstrates**: OneToMany relationship (Brand → Models)

### 7. Features (`/features`)
- Simple CRUD for car features
- Used in ManyToMany relationship with Cars

## 🔧 Technologies Used

- **React 18** - UI framework
- **React Router DOM 6** - Routing
- **React Bootstrap** - UI components
- **Bootstrap 5** - Styling
- **Axios** - HTTP client

## 📝 Notes

- User authentication is mocked (hardcoded `userId: 1`)
- Photo upload expects URL strings (not file upload)
- Backend must be running on `http://localhost:8080`
- CORS must be configured on backend for `http://localhost:3000`

## 🐛 Troubleshooting

### CORS Errors
Add to backend `application.properties`:
```properties
spring.web.cors.allowed-origins=http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,PATCH,DELETE,OPTIONS
```

### Connection Refused
Ensure backend is running on port 8080:
```bash
# In backend directory
./mvnw spring-boot:run
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Key Concepts Demonstrated

### OneToMany Relationships
- **Brand → Models**: Selecting a brand filters and displays only its models
- **Advertisement → Photos**: Photo gallery shows all photos belonging to an advertisement

### ManyToMany Relationships
- **Car ↔ Features**: 
  - Multiple features can be selected for a car
  - Multiple cars can have the same feature
  - Implemented via checkbox selection in form
  - Displayed as badges in details view

### CRUD Operations
- All entities support Create, Read, Update, Delete
- Form validation matches backend requirements
- Error handling with user-friendly messages

### Filtering & Pagination
- Client-side filter state management
- API integration with Spring Data Pageable
- Pagination controls with page numbers
- Results count display

---

**Developed for BSUIR Laboratory Work**
