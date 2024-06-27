import { test, expect } from '@playwright/experimental-ct-react'
import { Button } from '../src/core/index'
import React from 'react'

test('Button component', async ({ mount }) => {
  const component = await mount(<Button />)
  await expect(component.getByText('click me')).toBeVisible()
})
