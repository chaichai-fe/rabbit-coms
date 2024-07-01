import { test, expect } from '@playwright/experimental-ct-react'
import { Counter } from '../src/core/index'
import React from 'react'

test('test innitialCount', async ({ mount }) => {
  const component = await mount(<Counter initialCount={1} />)
  await expect(component.getByTestId('input')).toHaveValue('1')
})

test('test inc', async ({ mount }) => {
  const component = await mount(<Counter initialCount={1} />)
  await component.getByText('+').click()
  await expect(component.getByTestId('input')).toHaveValue('2')
  await component.getByText('+').click()
  await expect(component.getByTestId('input')).toHaveValue('3')
})

test('test des', async ({ mount }) => {
  const component = await mount(<Counter initialCount={5} />)
  await component.getByText('-').click()
  await expect(component.getByTestId('input')).toHaveValue('4')
  await component.getByText('-').click()
  await expect(component.getByTestId('input')).toHaveValue('3')
})

test('test des by min', async ({ mount }) => {
  const component = await mount(<Counter initialCount={4} min={2} />)
  await component.getByText('-').click()
  await expect(component.getByTestId('input')).toHaveValue('3')
  await component.getByText('-').click()
  await expect(component.getByTestId('input')).toHaveValue('2')
  await component.getByText('-').click()
  await expect(component.getByTestId('input')).toHaveValue('2')
})
