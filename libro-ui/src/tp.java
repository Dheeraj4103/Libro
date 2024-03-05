// Java program using Bitmask to
// Change all even bits in a
// number to 0
import java.io.*;

class tp {

	static int convertEvenBitToOne(int n)
	{
		return n - (n & 0xaaaaaaaa);
	}

	// Driver code
	public static void main(String[] args)
	{
		int n = 18;
		System.out.println(convertEvenBitToOne(n));
	}
}

// This code is contributed by anuj_67.
