import React from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import AccountPage from '@/components/dashboard/pages/AccountPage'

const account = () => {
  return (
      <DashboardLayout>
          <AccountPage />
        </DashboardLayout>
  )
}

export default account
