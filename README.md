# Marcura Frontend Developer Test - Angular Components

## Component List

### 1. `MapComponent`

- **Responsibility**: Displaying the global map.
- **Features**:
  - Initialize without showing any routes.
  - Draw the selected shipping route on the map based on user selection.

### 2. `RoutePickerComponent`

- **Responsibility**: Allowing users to select a shipping route.
- **Features**:
  - Parse route data from the CSV file.
  - Provide a list of routes for the user to choose from.
  - Notify `MapComponent` to update the map when a route is selected.

### 3. `SpeedChartComponent`

- **Responsibility**: Displaying speed changes over time for the selected route.
- **Features**:
  - Generate a speed-time chart for the selected shipping route.
  - Use Google Charts or another charting library for visualization.

### 4. `DataService`

- **Responsibility**: Handling CSV file parsing and data sharing.
- **Features**:
  - Parse the CSV file and provide parsed data to `RoutePickerComponent` and `SpeedChartComponent`.
  - Implemented as a service for data sharing between components.

### 5. `AppComponent`

- **Responsibility**: Serving as the main application component and container for other components.
- **Features**:
  - Integrate `MapComponent`, `RoutePickerComponent`, and `SpeedChartComponent`.
  - Manage the overall layout and styling of the application.

## Component Interaction

- **`RoutePickerComponent` and `MapComponent`**:
  - When a route is selected in `RoutePickerComponent`, notify `MapComponent` to draw the route on the map.

- **`RoutePickerComponent` and `SpeedChartComponent`**:
  - The same route selection should update `SpeedChartComponent` to display the speed chart of the selected route.


## Local Run Instructions

To run this Angular application locally, follow these simple steps:

### Running the Application

1. **Start the Development Server**:
  - Open a terminal or command prompt in the project's root directory.
  - Run `ng serve` to start the Angular development server.

2. **Accessing the Application**:
  - Once the server is running, open a web browser.
  - Navigate to `http://localhost:4200/`.
  - The application should now be accessible and fully functional on your local machine.
