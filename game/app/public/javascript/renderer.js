'use_strict'

export class Renderer
{
    static #canvas;
    static #context;

    static init(canvas, graphics_context)
    {
        Renderer.#canvas = canvas;
        Renderer.#context = canvas.getContext(graphics_context);
    }

    static get_width()
    {
        return Renderer.#canvas.width;
    }

    static get_height()
    {
        return Renderer.#canvas.height;
    }

    static render(x, y, width, height)
    {
        Renderer.#context.fillRect(x, y, width, height);
    }
}