pipeline {
  agent any
  environment {
    SCANNER_QUBE_HOME = tool 'SonarQubeScanner'
    CURRENT_WORKSPACE = "${env.WORKSPACE}"
  }
  options {
    disableConcurrentBuilds()
  }
  stages {
    stage('Sonarqube Analysis') {
      when {
        anyOf {
          branch 'develop'
          allOf {
            environment name: 'CHANGE_TARGET', value: 'develop'
            branch 'PR-*'
          }
        }
      }
      steps {
        script {
          withSonarQubeEnv("9thWonder SonarQube VN") {
            sh "${SCANNER_QUBE_HOME}/bin/sonar-scanner"
          }
          def qg = waitForQualityGate()
          if(qg.status != "OK"){
            echo "${qg.status}"
            error "Pipeline aborted due to quality gate coverage failure: ${qualitygate.status}"
          }
        }
      }
    }
  }
}