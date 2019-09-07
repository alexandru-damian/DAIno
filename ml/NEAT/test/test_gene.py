import unittest
from neat import node


class Gene:
    def __init__(self, in_node, out_node):
        self.__in_node = in_node
        self.__out_node = out_node

    def get_in_out_nodes(self):
        return self.__in_node, self.__out_node


class TestGene(unittest.TestCase):

    def test_in_and_out_node_should_be_different(self):
        dummy_gene = Gene(node.Node(), node.Node())

        in_node, out_node = dummy_gene.get_in_out_nodes()
        self.assertNotEqual(in_node.get_id(), out_node.get_id())

