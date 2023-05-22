import React from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import DashboardHomePage from '@/components/dashboard/pages/HomePage'

const index = () => {
    return (
        <DashboardLayout>
            <DashboardHomePage />
        </DashboardLayout>
  )
}

export default index
