'use_strict'

export class Renderer
{
    #canvas;
    #context;

    constructor(canvas, graphics_context)
    {
        this.#canvas = canvas;
        this.#context = this.#canvas.getContext(graphics_context);
    }

    get_context()
    {
        return this.#context;
    }

    get_width()
    {
        return this.#context.width;
    }

    get_height()
    {
        return this.#context.height;
    }

    render(x, y, width, height)
    {
        this.#context.fillRect(x, y, width, height);
    }
}