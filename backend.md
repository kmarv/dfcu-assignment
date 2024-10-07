
### Local Deployment Guide for Laravel 11

#### Prerequisites

1. PHP: Ensure PHP is installed (version 8.2 or higher).
2. Composer: Make sure Composer is installed. You can check this by running:
   ```bash
   composer --version
   ```
3. **Node.js and npm**: If you plan to use Laravel Mix, Node.js and npm should also be installed.
4. **Database**: Install MySQL, PostgreSQL, or any database of your choice.
5. **Xampp installation**: install xampp on you machine that has php 8.2 or higher

#### Step 1: Clone the Repository

If you are working with a repository, clone it using:

```bash
git clone https://github.com/yourusername/your-laravel-app.git
git checkout backend 
cd your-laravel-app
```

#### Step 2: Install Dependencies

Run the following command to install the required PHP packages:

```bash
composer install
```

If you are using npm for front-end assets, install those dependencies as well:

```bash
npm install
```

#### Step 3: Create Environment File

Copy the example environment file to create your own:

```bash
cp .env.example .env
```

#### Step 4: Configure Environment Variables

Edit the `.env` file and configure the following settings:

- **Database settings**: Update the `DB_*` variables with your database credentials.
  
  ```dotenv
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=dfcu_hr
  DB_USERNAME=root
  DB_PASSWORD=
  ```

for mail setup ...you need to replace the value in your env with 

```dotenv
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=ed50e649d535cf
MAIL_PASSWORD=3d1132bf07cee1
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS="nonreply@gmail.com"
MAIL_FROM_NAME="DFCU HR"
```

- Other relevant settings based on your application requirements.

#### Step 5: Generate Application Key

Run the following command to generate a new application key:

```bash
php artisan key:generate
```
 ### Step 6 : Start your xampp application 
  start xampp 
  begin the apache and mysql servers

#### Step 6: Run Migrations and Seed the Database

run migrations:

```bash
php artisan migrate
```

run seeder 
```bash 
php artisan db:seed
```

#### Step 7: Start the Local Development Server

You can start the built-in Laravel development server using:

```bash
php artisan serve
```

####  Additional Services

- **Queue services**: The  application uses queues, you need run the queue worker:

  ```bash
  php artisan queue:work
  ```

- **Caching**: If using caching, run the command to clear cache and optimize:

  ```bash
  php artisan optimize
  ```

### Troubleshooting Tips

- Ensure your database server is running.
- Check for any errors in your application logs located in `storage/logs`.
- Use `php artisan config:cache` to clear and cache your configuration if you make changes to the `.env` file.


To access the admin dashbaord 
go to 
```url 
 http://127.0.0.1:8000/pulseLogin
 ```

 the credentials are
 username : admin
 password : password

### Conclusion
Following these steps, you should have your Laravel 11 application running locally. Adjust any steps as needed based on your application’s specific requirements. If you have any issues, feel free to ask for help!
