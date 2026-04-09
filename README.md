📱 Weather App - Project Summary
App Description
My weather application is a complete, responsive web app that allows users to view current weather conditions for any city in the world. The app uses Open-Meteo's free APIs to retrieve real-time data such as temperature, wind speed, humidity, and general conditions (clear sky, rain, snow, thunderstorms, etc.).

Key features include:

Single City Search: Entering a city name displays formatted weather data instantly

Smart Cache: Results are stored locally for one hour, reducing API calls and speeding up repeated searches

Force Refresh: Button to update data while ignoring the cache

Multi-City Comparison: Ability to compare weather conditions of multiple cities side by side

Enter Key Support: Full keyboard support for both input fields

Artificial Intelligence Usage
During development, I used AI (ChatGPT/DeepSeek) in several phases:

Project Structure: AI suggested a modular architecture with separated files for API, services, UI, and utilities, making the code maintainable and scalable.

Debugging and Error Resolution: When encountering errors like require is not defined or issues with ES6 module imports, AI guided me through fixes, explaining the differences between browser and Node.js environments.

Cache Implementation: I received assistance in creating an efficient caching system using localStorage, including expiration logic.

Event Handling: AI helped me correctly implement event listeners for the Enter key on both input fields.

Challenges and Learnings
The biggest challenge was managing the modular architecture with ES6 modules, ensuring all imports/exports were correct. I learned the importance of separating responsibilities: API calls, business logic, UI management, and utilities into distinct files.

I also gained a better understanding of Promises, asynchronous functions, and error handling in fetch calls.

What I'm Proud Of
I am particularly proud of the caching system I implemented. Not only does it improve performance, but it also allows the app to work offline for previously searched cities, providing a smooth user experience.

Future Improvement
If I had more time, I would implement 5-day forecasts with temperature charts, automatic geolocation to detect the user's city, and a customizable dark/light theme.

Technologies Used: HTML5, CSS3, JavaScript (ES6+), Open-Meteo API, LocalStorage for caching
