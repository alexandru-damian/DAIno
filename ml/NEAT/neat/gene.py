class Gene:
    def __init__(self, in_node, out_node):
        self.__in_node = in_node
        self.__out_node = out_node

    def get_in_out_nodes(self):
        return self.__in_node, self.__out_node
