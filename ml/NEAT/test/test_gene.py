import unittest
from neat import node, gene


class TestGene(unittest.TestCase):

    def test_in_and_out_node_should_be_different(self):
        dummy_gene = gene.Gene(node.Node(), node.Node())

        in_node, out_node = dummy_gene.get_in_out_nodes()
        self.assertNotEqual(in_node.get_id(), out_node.get_id())

