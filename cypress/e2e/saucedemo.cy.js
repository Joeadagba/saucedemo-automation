/// <reference types="cypress" />

describe('Saucedemo Automation Assessment', () => {
  
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  // LOGIN TESTS (Valid & Invalid)
  describe('Login Tests', () => {

    it('VALID: Login with standard_user', () => {
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
      
      cy.url().should('include', '/inventory.html');
      cy.get('.title').should('have.text', 'Products');
    });

    it('VALID: Login with problem_user', () => {
      cy.get('[data-test="username"]').type('problem_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
      
      cy.url().should('include', '/inventory.html');
    });

    it('VALID: Login with performance_glitch_user', () => {
      cy.get('[data-test="username"]').type('performance_glitch_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
      
      cy.url().should('include', '/inventory.html');
    });

    it('INVALID: Locked out user cannot login', () => {
      cy.get('[data-test="username"]').type('locked_out_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
      
      cy.get('[data-test="error"]').should('be.visible');
      cy.get('[data-test="error"]').should('contain', 'locked out');
    });

    it('INVALID: Wrong password', () => {
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('wrongpassword123');
      cy.get('[data-test="login-button"]').click();
      
      cy.get('[data-test="error"]').should('be.visible');
      cy.get('[data-test="error"]').should('contain', 'do not match');
    });

    it('INVALID: Empty username', () => {
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
      
      cy.get('[data-test="error"]').should('be.visible');
      cy.get('[data-test="error"]').should('contain', 'Username is required');
    });

    it('INVALID: Empty password', () => {
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="login-button"]').click();
      
      cy.get('[data-test="error"]').should('be.visible');
      cy.get('[data-test="error"]').should('contain', 'Password is required');
    });

    it('INVALID: Both fields empty', () => {
      cy.get('[data-test="login-button"]').click();
      
      cy.get('[data-test="error"]').should('be.visible');
      cy.get('[data-test="error"]').should('contain', 'Username is required');
    });

    it('INVALID: Case sensitive username', () => {
      cy.get('[data-test="username"]').type('STANDARD_USER');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
      
      cy.get('[data-test="error"]').should('be.visible');
    });

    it('INVALID: Non-existent user', () => {
      cy.get('[data-test="username"]').type('fakeuser123');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
      
      cy.get('[data-test="error"]').should('contain', 'do not match');
    });
  });

  
  // ADD PRODUCT & CHECKOUT TESTS
  describe('Add Product & Checkout Tests', () => {
    
    beforeEach(() => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click();
    });

    it('VALID: Add single product to cart', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_badge').should('have.text', '1');
    });

    it('VALID: Add multiple products to cart', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
      cy.get('.shopping_cart_badge').should('have.text', '2');
    });

    // CHECKOUT TESTS
    it('VALID: Complete checkout process', () => {
      // Step 1: Add product
      cy.log('STEP 1: Adding product to cart');
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_badge').should('have.text', '1');
      
      // Step 2: Go to cart
      cy.log('STEP 2: Going to cart');
      cy.get('.shopping_cart_link').click();
      cy.url().should('include', '/cart.html');
      
      // Step 3: Click checkout
      cy.log('STEP 3: Clicking checkout');
      cy.get('[data-test="checkout"]').click();
      cy.url().should('include', '/checkout-step-one.html');
      
      // Step 4: Fill information
      cy.log('STEP 4: Filling checkout information');
      cy.get('[data-test="firstName"]').type('John');
      cy.get('[data-test="lastName"]').type('Doe');
      cy.get('[data-test="postalCode"]').type('12345');
      
      // Step 5: Continue
      cy.log('STEP 5: Clicking continue');
      cy.get('[data-test="continue"]').click();
      
      // Step 6: Wait for overview page
      cy.log('STEP 6: Waiting for overview page');
      cy.url().should('include', '/checkout-step-two.html', { timeout: 10000 });
      
      // Step 7: Verify product
      cy.log('STEP 7: Verifying product in overview');
      cy.get('.inventory_item_name').should('contain', 'Sauce Labs Backpack');
      
      // Step 8: Look for Finish button
      cy.log('STEP 8: Looking for Finish button');
      cy.get('[data-test="finish"]').should('exist');
      cy.get('[data-test="finish"]').should('be.visible');
      
      // Step 9: Click Finish
      cy.log('STEP 9: Clicking Finish button');
      cy.get('[data-test="finish"]').click();
      
      // Step 10: Verify success
      cy.log('STEP 10: Verifying success page');
      cy.url().should('include', '/checkout-complete.html', { timeout: 10000 });
      cy.get('.complete-header').should('be.visible').and('contain', 'Thank you');
      
      cy.log('✅ CHECKOUT TEST COMPLETED SUCCESSFULLY');
    });

    // SIMPLIFIED CHECKOUT TEST (BACKUP) 
    it('VALID: Simplified checkout', () => {
      // Just add one product and complete checkout
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      cy.get('[data-test="firstName"]').type('John');
      cy.get('[data-test="lastName"]').type('Doe');
      cy.get('[data-test="postalCode"]').type('12345');
      cy.get('[data-test="continue"]').click();
      
      // Simple click with force option
      cy.get('[data-test="finish"]').click({ force: true });
      
      cy.get('.complete-header').should('contain', 'Thank you');
    });

    it('INVALID: Checkout with empty first name', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      
      cy.get('[data-test="lastName"]').type('Doe');
      cy.get('[data-test="postalCode"]').type('12345');
      cy.get('[data-test="continue"]').click();
      
      cy.get('[data-test="error"]').should('contain', 'First Name');
    });

    it('INVALID: Checkout with empty last name', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      
      cy.get('[data-test="firstName"]').type('John');
      cy.get('[data-test="postalCode"]').type('12345');
      cy.get('[data-test="continue"]').click();
      
      cy.get('[data-test="error"]').should('contain', 'Last Name');
    });

    it('INVALID: Checkout with empty postal code', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
      cy.get('.shopping_cart_link').click();
      cy.get('[data-test="checkout"]').click();
      
      cy.get('[data-test="firstName"]').type('John');
      cy.get('[data-test="lastName"]').type('Doe');
      cy.get('[data-test="continue"]').click();
      
      cy.get('[data-test="error"]').should('contain', 'Postal Code');
    });
  });
});