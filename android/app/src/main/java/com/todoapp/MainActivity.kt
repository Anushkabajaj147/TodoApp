package com.todoapp

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "TodoApp"

    override fun onCreate(savedInstanceState: Bundle?) {
        SplashScreen.show(this)  // Ensure SplashScreen is properly installed
        super.onCreate(null)
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate {
        return DefaultReactActivityDelegate(
            this, mainComponentName, DefaultNewArchitectureEntryPoint.fabricEnabled
        )
    }
}
