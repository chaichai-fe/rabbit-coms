import { test, expect } from '@playwright/experimental-ct-react'
import { Counter } from '../src/core/index'
import React from 'react'

test('test innitialCount', async ({ mount }) => {
  const component = await mount(<Counter initialCount={1} />)
  await expect(component.getByTestId('input')).toHaveValue('1')
})
