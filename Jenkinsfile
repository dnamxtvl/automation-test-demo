pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    // Di chuyển đến thư mục của dự án
                    dir('/var/www/html/project/automation-test-demo') {
                        // Cài đặt npm dependencies
                        // Cấu hình safe directory cho Git
                        sh 'git config --global --add safe.directory /var/www/html/project/automation-test-demo'
                        // Lưu trữ thay đổi hiện tại
                        sh 'git stash'
                        // Chuyển sang nhánh master
                        sh 'git checkout master'
                        // Kéo các thay đổi từ master
                        sh 'git pull origin master'
                        // Chạy test bằng Playwright
                        sh 'npx playwright test'
                        // Thêm các thay đổi mới vào staged area
                        sh 'git add .'
                        // Commit thay đổi
                        sh 'git commit -m "Run test"'
                        // Đẩy các thay đổi lên remote repository
                        sh 'git push origin master'
                    }
                }
            }
        }
    }
}
