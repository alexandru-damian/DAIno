class Player {

    #y_velocity = 0
    #Y_ACCELERATION = -15

    #isFalling = false
    #jumpPressed = false 

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;
  }

  get isFalling()
  {
    return this.#isFalling;
  }

  set jumpPressed(jumpPressed)
  {
    this.#jumpPressed = jumpPressed;
  }

  get jumpPressed()
  {
    return this.#jumpPressed
  }

}

