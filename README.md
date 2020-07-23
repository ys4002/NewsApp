The application has following features:
1. /registration -> Users can register here
2. /login -> user can login, token received is stored in the local storage
3. /list-user -> Here logged user can give the Agency, Category and Feed Url
    -Delete All News -> truncates the News table
    -logout -> deletes token and redirects to login page
    -Add Item -> to Add a new row for Agency, Category and Feed Url
    -Download Report -> downloads a pdf file with news title, click count and category info
4. /news-page:
    -Displays all the categories
    -When the categories are selected News table is populated
    -Table data is dynamic and changes as one moves through the categories
    -After selecting the categories the data is persisted even if the page is refreshed
    -Click here -> this button opens the news link is a new tab and incerases the click count
5. Guard is implemented to avoid user from opening login or registration page when the user is logged in
6. Interceptor is implemented to send token as header with each request
7. Custom password validators are implemented to match the passwords
8. jsPDF library used to generate the report pdf