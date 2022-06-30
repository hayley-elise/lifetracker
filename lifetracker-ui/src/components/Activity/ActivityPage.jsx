import * as React from "react"
import ActivityFeed from "./Feed/ActivityFeed"
import ActivityContextProvider from "../contexts/activity.jsx"
import Loading from "../Loading/Loading"

export default function ActivityPage() {
    
    return (
        <div className = "activity-page">
          {/* call useActivityContext hook */}
          {/* if isProcessing is true, render Loading compoment */}
          {/* <Loading/> */}

          {/* if isProcessing is false, render ActivityFeed component */}
          <ActivityFeed/>
        </div>
      )

}